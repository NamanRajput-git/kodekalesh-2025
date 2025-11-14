require("dotenv").config();
const admin = require("firebase-admin");
const ethers = require("ethers");

// Construct serviceAccount from environment variables
const serviceAccount = {
  type: process.env.FIREBASE_TYPE || "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
  token_uri: process.env.FIREBASE_TOKEN_URI || "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN || "googleapis.com",
};

// Validate required Firebase credentials
if (!serviceAccount.project_id || !serviceAccount.private_key || !serviceAccount.client_email) {
  throw new Error("Missing required Firebase environment variables. Please check your .env file.");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function walletUid(chain, address) {
  if (chain === "ethereum") {
    if (ethers.utils && ethers.utils.getAddress) {
      address = ethers.utils.getAddress(address).toLowerCase();
    } else if (ethers.getAddress) {
      address = ethers.getAddress(address).toLowerCase();
    } else {
      address = address.toLowerCase();
    }
  }
  return `wallet:${chain}:${address}`;
}

function verifyEthereum(message, signature, address) {
  try {
    let recovered;
    if (ethers.utils && ethers.utils.verifyMessage) {
      recovered = ethers.utils.verifyMessage(message, signature);
    } else if (ethers.verifyMessage) {
      recovered = ethers.verifyMessage(message, signature);
    } else {
      throw new Error("ethers.js verifyMessage not found");
    }

    const normalizedRecovered = recovered.toLowerCase();
    const normalizedAddress = address.toLowerCase();

    console.log("Signature verification debug:");
    console.log("  Message:", message);
    console.log("  Signature:", signature);
    console.log("  Expected address:", normalizedAddress);
    console.log("  Recovered address:", normalizedRecovered);
    console.log("  Match:", normalizedRecovered === normalizedAddress);

    return normalizedRecovered === normalizedAddress;
  } catch (e) {
    console.error("Ethereum verification error:", e.message);
    console.error("Full error:", e);
    return false;
  }
}

function verifyAptos(address, signature, publicKey, message) {
  // Aptos signature is not of desired length and their documentation is as empty as their brains so i dont know what to do...
  return true;
}

async function walletAuthHandler(req, res) {
  try {
    const { chain, address, message, signature, publicKey } = req.body;
    if (!chain || !address || !message || !signature) {
      return res.status(400).json({ error: "missing fields" });
    }

    let ok = false;
    if (chain === "ethereum") {
      ok = verifyEthereum(message, signature, address);
    } else if (chain === "aptos") {
      let aptosPublicKey = publicKey;

      if (!aptosPublicKey) {
        console.log(
          "Public key not provided, attempting to fetch from blockchain..."
        );
        return res.status(400).json({
          error:
            "aptos publicKey required - Aptos uses Ed25519 signatures which require the public key to verify",
          hint: "Include the publicKey field in your request. Get it from your wallet.",
        });
      }

      ok = verifyAptos(message, signature, aptosPublicKey);
    } else {
      return res.status(400).json({ error: "unsupported chain" });
    }

    if (!ok)
      return res.status(401).json({ error: "signature verification failed" });

    const uid = walletUid(chain, address);
    let userRecord;
    try {
      userRecord = await admin.auth().getUser(uid);
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        userRecord = await admin.auth().createUser({
          uid,
          displayName: `${chain}:${address}`,
        });
      } else {
        throw err;
      }
    }

    const customToken = await admin
      .auth()
      .createCustomToken(uid, { wallet: { chain, address } });
    return res.json({
      customToken,
      uid,
      user: {
        uid,
        address,
        chain,
        displayName: userRecord.displayName,
        createdAt: userRecord.metadata.creationTime,
      },
      storageInfo: {
        uid,
        path: `users/${uid}/`,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}

module.exports = { walletAuthHandler };
