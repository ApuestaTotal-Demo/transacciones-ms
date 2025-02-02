import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Producer, Consumer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
    private kafka: Kafka;
    private producer: Producer;
    private consumer: Consumer;

    constructor() {
        this.kafka = new Kafka({
            clientId: 'transacciones-service',
            brokers: ['92.118.57.218:9092'],
        });
        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: 'transacciones-group' });
    }

    async onModuleInit() {
        await this.producer.connect();
        await this.consumer.connect();
    }

    async onModuleDestroy() {
        await this.producer.disconnect();
        await this.consumer.disconnect();
    }

    async emit(topic: string, event: any): Promise<void> {
        await this.producer.send({
            topic,
            messages: [{ value: JSON.stringify(event) }],
        });
    }

    async subscribe(topic: string, callback: (message: any) => void): Promise<void> {
        await this.consumer.subscribe({ topic, fromBeginning: true });
        await this.consumer.run({
            eachMessage: async ({ message }) => {
                callback(JSON.parse(message.value.toString()));
            },
        });
    }
}