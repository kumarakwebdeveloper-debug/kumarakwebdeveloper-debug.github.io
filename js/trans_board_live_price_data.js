async function loadZRZMarketData() {
  try {
    // ENCODED API
    const encodedApi =
      "aHR0cHM6Ly9hcGkuZGV4c2NyZWVuZXIuY29tL2xhdGVzdC9kZXgvcGFpcnMvYnNjLzB4YjRkMjQ3YjljZDNjZjMyODYwMzc2NTY2YzNlMDIwMDRmNDQ4NGE3OQ==";

    const apiUrl = atob(encodedApi);

    const response = await fetch(apiUrl);

    const data = await response.json();

    const pair = data.pairs[0];

    // VALUES
    const price = "$" + Number(pair.priceUsd).toFixed(6);
    const marketCap = "$" + Number(pair.marketCap).toLocaleString();
    const liquidity = "$" + Number(pair.liquidity.usd).toFixed(2);
    const volume = "$" + Number(pair.volume.h24).toFixed(2);
    const buys = pair.txns.h24.buys;
    const sells = pair.txns.h24.sells;

    // Live Market Snapshot Data
    const zrzPrice = document.getElementById("zrzPrice");
    const marketCapEl = document.getElementById("marketCap");
    const liquidityEl = document.getElementById("liquidity");
    const volumeEl = document.getElementById("volume24h");
    const buysEl = document.getElementById("buys24h");
    const sellsEl = document.getElementById("sells24h");

    if (zrzPrice) zrzPrice.innerText = price;
    if (marketCapEl) marketCapEl.innerText = marketCap;
    if (liquidityEl) liquidityEl.innerText = liquidity;
    if (volumeEl) volumeEl.innerText = volume;
    if (buysEl) buysEl.innerText = buys;
    if (sellsEl) sellsEl.innerText = sells;

    // Grids Section data
    const gridPrice = document.getElementById("gridPrice");

    const gridMarketCap = document.getElementById("gridMarketCap");

    const gridLiquidity = document.getElementById("gridLiquidity");

    const gridVolume = document.getElementById("gridVolume");

    const gridBuys = document.getElementById("gridBuys");

    const gridSells = document.getElementById("gridSells");

    if (gridPrice) gridPrice.innerText = price;
    if (gridMarketCap) gridMarketCap.innerText = marketCap;
    if (gridLiquidity) gridLiquidity.innerText = liquidity;
    if (gridVolume) gridVolume.innerText = volume;
    if (gridBuys) gridBuys.innerText = buys;
    if (gridSells) gridSells.innerText = sells;
  } catch (error) {
    console.error("Failed to load ZRZ market data:", error);
  }
}

loadZRZMarketData();

// AUTO REFRESH EVERY 20 SECONDS AK
setInterval(loadZRZMarketData, 20000);
