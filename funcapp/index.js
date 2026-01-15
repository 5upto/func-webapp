const express = require("express");
const axios = require("axios");
const dns = require("dns").promises;

const app = express();
const port = process.env.PORT || 3000;

const FUNCTION_URL = "https://funcapp-terraform-hzcvc2c9axbzduh3.centralindia-01.azurewebsites.net/api/health";

app.get("/", async (req, res) => {
  try {
    const dnsResult = await dns.lookup("funcapp-terraform.azurewebsites.net");
    const response = await axios.get(FUNCTION_URL, { timeout: 5000 });

    res.json({
      status: "SUCCESS",
      dnsResolvedIP: dnsResult.address,
      functionStatusCode: response.status,
      functionResponse: response.data
    });
  } catch (err) {
    res.status(500).json({
      status: "FAILED",
      error: err.message
    });
  }
});

app.listen(port, () => {
  console.log(`Test app running on port ${port}`);
});
