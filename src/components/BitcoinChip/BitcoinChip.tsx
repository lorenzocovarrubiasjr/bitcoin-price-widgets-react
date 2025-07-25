import { useState, useEffect } from 'react';
import BTCShortLogo from '../../assets/bitcoin-short-logo.png'
import './BitcoinChip.css'
import Tooltip from '../shared/Tooltip/Tooltip';

const Platform = {
    'coingecko': 'CoinGecko API'
}

const BitcoinChip = () => {
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
        <Tooltip content={`${Platform.coingecko} last update: ${lastUpdated?.toLocaleString()}`}>
            <div className="container">
                <div className='logo-sm'>
                    <img src={BTCShortLogo} />
                </div>
                <div className="currency-container-sm">
                    <div className="info-column-sm">
                        <div className="symbol-sm">$</div>
                        <div className="currency-sm">USD</div>
                    </div>
                    <div className="current-price-sm">
                        {currentPrice}
                    </div>
                </div>
                <div className="blinking-dot-md"></div>
            </div>
        </Tooltip>
    )
}

export { BitcoinChip };