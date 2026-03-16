import { SETTINGS_STORAGE_KEYS } from './constants.js';

async function loadSettings() {
    const data = await chrome.storage.local.get([
      SETTINGS_STORAGE_KEYS.apiKeys,
      SETTINGS_STORAGE_KEYS.provider
    ]);
  
    const keys = data[SETTINGS_STORAGE_KEYS.apiKeys] || {};
  
    const provider = data[SETTINGS_STORAGE_KEYS.provider] || "openai";
  
    document.getElementById("settingsProvider").value=provider;
    document.getElementById("apiKeyInput").value=keys[provider] || "";
}

async function saveKeys(){
    const provider = document.getElementById("settingsProvider").value;
  
    const apiKey = document.getElementById("apiKeyInput")
      .value
      .trim();
  
    const data = await chrome.storage.local.get(
        SETTINGS_STORAGE_KEYS.apiKeys
    );
  
    const keys=data[SETTINGS_STORAGE_KEYS.apiKeys]||{};
  
    keys[provider]=apiKey;
  
    await chrome.storage.local.set({
      [SETTINGS_STORAGE_KEYS.apiKeys]:keys
    });
  
    document.getElementById("saveStatus")
      .textContent="Saved!";
}

async function getSettings() {
  const obj = await chrome.storage.local.get([
    SETTINGS_STORAGE_KEYS.provider,
    SETTINGS_STORAGE_KEYS.apiKeys,
    SETTINGS_STORAGE_KEYS.language
  ]);

  const provider = obj?.[SETTINGS_STORAGE_KEYS.provider] ?? "openai";
  const apiKeys = obj?.[SETTINGS_STORAGE_KEYS.apiKeys] ?? {};
  const language = obj?.[SETTINGS_STORAGE_KEYS.language] ?? "en";

  return {
    provider,
    language,
    apiKey: (apiKeys && apiKeys[provider]) || ""
  };
}

document
  .getElementById("settingsButton")
  .addEventListener("click",async()=>{
    document.getElementById("mainView").style.display="none";
    document.getElementById("settingsSection").style.display="block";
    loadSettings();
  });

document
  .getElementById("saveKeysButton")
  .addEventListener("click",saveKeys);

export { getSettings };
