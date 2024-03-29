import axios from "axios"
import { useEffect, useState } from "react";

export default function PaymentLog() {
    const backend_url = process.env.REACT_APP_BACKEND_URL;
    const [logs, setLogs] = useState([]);
    useEffect(() => {
        axios.get(`${backend_url}/payment/log`)
        .then(res => {
            setLogs(res.data.data);
        })
        .catch(err => {
            console.error(err);
        });
    },[backend_url]);
    return (
        <>
            <h1>PAYMENT LOG</h1>
            <table>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Balance Change</th>
                        <th>Current Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        logs.map((log, index) => {
                        return (
                            <tr key={index}>
                                <td>{log.payment_time}</td>
                                <td>{parseInt(log.balance_change).toLocaleString('id-ID')}</td>
                                <td>{parseInt(log.current_balance).toLocaleString('id-ID')}</td>
                            </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        </>
    )

}