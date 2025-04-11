import HmacSHA256 from 'crypto-js/hmac-sha256';
import Hex from 'crypto-js/enc-hex';

document.addEventListener('DOMContentLoaded', () => {
  const accessTokenInput = document.getElementById('accessToken') as HTMLInputElement;
  const appSecretInput = document.getElementById('appSecret') as HTMLInputElement;
  const generateButton = document.getElementById('generate') as HTMLButtonElement;
  const resultElement = document.getElementById('result') as HTMLPreElement;

  generateButton.addEventListener('click', () => {
    const accessToken = accessTokenInput.value.trim();
    const appSecret = appSecretInput.value.trim();

    if (!accessToken || !appSecret) {
      resultElement.textContent = 'Please enter both access token and app secret';
      return;
    }

    try {
      // Generate appsecret_proof using HMAC SHA256
      const appsecretProof = HmacSHA256(accessToken, appSecret);
      // Convert to hexadecimal
      const hexResult = appsecretProof.toString(Hex);
      
      resultElement.textContent = hexResult;
    } catch (error) {
      resultElement.textContent = `Error: ${error.message}`;
    }
  });
});