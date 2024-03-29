import { useState, useEffect } from "react";
import mqtt from 'mqtt';

export default function Home() {
    const [info, setInfo] = useState('');
    const [logTopic, setLogTopic] = useState('/iot-payment/payment/log');
    useEffect(() => {
        const mqtt_client = mqtt.connect(`${process.env.REACT_APP_MQTT_WS_URL}`);
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
                    if (change < 0) {
                        setInfo(`TRANSAKSI BERHASIL, SISA SALDO Rp${credit}`);
                        setTimeout(() => {
                            setInfo(``);
                        }, 5000);
                    }
                    else if (change === 0) {
                        setInfo('SALDO TIDAK MENCUKUPI');
                        setTimeout(() => {
                            setInfo(``);
                        }, 5000);
                    }
                }
            }
        });
        return () => {
          mqtt_client.end(true);
        };
      }, [logTopic]);

    return (
    <>
      <h1>Merchant Reader</h1>
      <h1>{info}</h1>
    </>
    )
}