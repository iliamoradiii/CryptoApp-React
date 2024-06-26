import {RotatingLines} from 'react-loader-spinner'

import chartUp from '../../assets/chart-up.svg'
import chartDown from '../../assets/chart-down.svg'
import styles from '../modules/TableCoin.module.css'
import { marketChart } from '../../services/CryptoApi'

function TableCoin({coins, isLoading, setChart, currency}) {
  return (
    <>
      {isLoading ? 
        <RotatingLines strokeColor='#3874FF' strokeWidth='2' />
        :
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Coin</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>24h</th>
                    <th>Total Volume</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {coins.map(coin => 
                    <TableRow coin={coin} key={coin.id} setChart={setChart} currency={currency} />
                )}
            </tbody>
        </table>
      }
    </>
  )
}

export default TableCoin

const TableRow = ({ coin, setChart, currency }) => {
    const {id, name, image, symbol, total_volume, current_price, price_change_percentage_24h:price_change} = coin;

    const showHandler = async () => {
        try {
            const res = await fetch(marketChart(id))
            const json = await res.json()
            setChart({...json, coin});
        } catch (error) {
            setChart(null);
        }
    };

    return(
        <tr>
            <td>
                <div className={styles.symbol} onClick={showHandler}>
                    <img src={image} alt="" />
                    <span>{symbol.toUpperCase()}</span>
                </div>
            </td>
            <td>{name}</td>
            <td>{current_price.toLocaleString()}
            {currency === "usd"? "$" : null}
            {currency === "eur"? "€" : null}
            {currency === "jpy"? "¥" : null}
            </td>
            <td className={price_change > 0 ? styles.success : styles.error}>{price_change.toFixed(2)}</td>
            <td>{total_volume.toLocaleString()}</td>
        
            <td>
                <img src={price_change > 0 ? chartUp : chartDown} alt={name} />
            </td>
        </tr>
    )
}