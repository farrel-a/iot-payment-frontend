import { useState, useEffect } from "react";
import mqtt from 'mqtt';

let mqtt_client;
export default function Topup() {
    const [info, setInfo] = useState('');
    const logTopic = '/iot-payment/payment/log';
    const topupTopic = '/iot-payment/balance/topup';
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
                const balance = log[1];
                if (!isNaN(change) && !isNaN(balance)) {
                    if (change > 0) {
                        setInfo(`TOP UP BERHASIL, SALDO Rp${balance}`);
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