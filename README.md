# kafkaZookeer

## Step 1: Initialize and start zookeper
sudo docker run --name zookeeper --network kafka-network -p 2181:2181 zookeeper

## Step 2: Initialize and start kafka
sudo docker run --name kafka --network kafka-network -p 9092:9092  \   
-e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \    
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \    
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \    
confluentinc/cp-kafka \