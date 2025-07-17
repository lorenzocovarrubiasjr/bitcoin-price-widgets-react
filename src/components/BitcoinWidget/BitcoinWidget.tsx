import './BitcoinWidget.css'
import BTCLogo from '../../assets/bitcoin_logo.png'
import { useEffect, useState } from 'react'

const Platform = {
    'coingecko': 'CoinGecko API'
}

const BitcoinWidget = () => {
    const [currentPrice, setCurrentPrice] = useState<string>();
    const [lastUpdated, setLastUpdated] = useState<Date>();

    const fetchBTCPrice = async () => {
        const resp = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        if (!resp.ok) throw new Error("Error fetchinb BTC Price");

        const data = await resp.json();
        console.log({ data })
        setCurrentPrice(new Intl.NumberFormat().format(data.bitcoin.usd))
        setLastUpdated(new Date());
    }

    useEffect(() => {
        fetchBTCPrice();
        const refreshPrice = setInterval(() => fetchBTCPrice(), 30000);

        return () => clearInterval(refreshPrice)
    }, [])

    return (
        <div className="glass-container md">
            <div className='top-section'>
                <img src={BTCLogo} />
            </div>
            <div className="middle-section">
                <div className="info-column">
                    <div className="symbol">$</div>
                    <div className="currency">USD</div>
                </div>
                <div className="current-price">
                    {currentPrice}
                </div>
            </div>
            <div className="bottom-section">
                <div className="live-chip">
                    <div className="blinking-dot"></div>
                    <div className="live-alert">LIVE</div>
                </div>
                <div> {lastUpdated && <p>{Platform.coingecko} last update: {lastUpdated.toLocaleString()}</p>}</div>
            </div>

        </div>
    )
}

export { BitcoinWidget };