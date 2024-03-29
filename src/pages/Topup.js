import { useState, useEffect } from "react";
import mqtt from 'mqtt';

let mqtt_client;
export default function Topup() {
    const [info, setInfo] = useState('');
    const [logTopic, setLogTopic] = useState('/iot-payment/payment/log');
    const [topupTopic, setTopupTopic] = useState('/iot-payment/balance/topup');
    useEffect(() => {
        mqtt_client = mqtt.connect(`${process.env.REACT_APP_MQTT_WS_URL}`);
        mqtt_client.on('connect', () => {
          console.log('Connected to MQTT broker');
          mqtt_client.subscribe(logTopic);
        });

        mqtt_client.on('message', (topic, message) => {
            if (topic === logTopic) {
                const log = message.toString().split(',');
                const change = parseInt(log[0]);
                const credit = log[1];
                if (!isNaN(change) && !isNaN(credit)) {
                    if (change > 0) {
                        setInfo(`TOP UP BERHASIL, SALDO Rp${credit}`);
                        setTimeout(() => {
                            setInfo(``);
                        }, 3000);
                    }
                }
            }
        });
    
        return () => {
          mqtt_client.end(true);
        };
      }, [logTopic]);

    function topup(val) {
        if (!isNaN(val) && val > 0) {
            mqtt_client.publish(topupTopic, val.toString());
        }
    }
    return (
        <>
            <h1>Top Up</h1>
            <input type="number" placeholder="Jumlah Top Up" id="topup_value"/>
            <br/>
            <br/>
            <input type="button" value="Top Up" onClick={() => topup(document.getElementById('topup_value').value)}/>
            <h1>{info}</h1>
        </>
    )
}