import mqtt from "mqtt"
import { useEffect } from "react";

export default function Ewallet() {

    useEffect(() => {
        const mqtt_client = mqtt.connect(`${process.env.REACT_APP_MQTT_WS_URL}`);
        mqtt_client.on('connect', () => {
          console.log('Connected to MQTT broker');
        });
    
        mqtt_client.on('error', (error) => {
            console.log(error);
        });

        mqtt_client.on('close', () => {
            console.log('Disconnected from MQTT broker');
        });
    
        return () => {
          mqtt_client.end(true);
        };
      }, []);

    return <h1>E-Wallet</h1>
}