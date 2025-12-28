import { _decorator, Component, Vec3, Color, Sprite } from 'cc';
import { GameManager } from '../Game/GameManager';
const { ccclass, property } = _decorator;

export enum VehicleType {
    CAR = 0,
    BUS = 1,
    BIKE = 2
}

@ccclass('Vehicle')
export class Vehicle extends Component {
    public speed: number = 100;
    public capacity: number = 1;
    public pollutionRate: number = 1;
    public type: VehicleType = VehicleType.CAR;

    private targetPosition: Vec3 = new Vec3();
    private isMoving: boolean = false;

    start() {
        // Vehicle starts moving automatically
    }

    update(deltaTime: number) {
        if (this.isMoving) {
            this.moveToTarget(deltaTime);
            
            if (this.pollutionRate > 0) {
                GameManager.getInstance()?.addPollution(this.pollutionRate * deltaTime * 0.01);
            }
        }
    }
     public moveTo(target: Vec3) {
        this.targetPosition = target.clone();
        this.isMoving = true;
    }

    private moveToTarget(deltaTime: number) {
        const currentPos = this.node.position;
        const direction = new Vec3();
        Vec3.subtract(direction, this.targetPosition, currentPos);
        
        const distance = direction.length();
        
        if (distance < 5) {
            this.isMoving = false;
            this.onReachedDestination();
            return;
        }

        direction.normalize();
        direction.multiplyScalar(this.speed * deltaTime);
        
        const newPos = new Vec3();
        Vec3.add(newPos, currentPos, direction);
        this.node.setPosition(newPos);
    }

    private onReachedDestination() {
        if (this.type === VehicleType.BUS) {
            GameManager.getInstance()?.addGreenPoints(this.capacity * 5);
        } else if (this.type === VehicleType.BIKE) {
            GameManager.getInstance()?.addGreenPoints(this.capacity * 10);
        }
        
        this.node.destroy();
    }
    public setupVehicle(type: VehicleType) {
        this.type = type;
        const sprite = this.node.getComponent(Sprite);
        
        switch(type) {
            case VehicleType.CAR:
                this.capacity = 2;
                this.speed = 150;
                this.pollutionRate = 2;
                if (sprite) sprite.color = new Color(255, 50, 50); // Red
                break;
            case VehicleType.BUS:
                this.capacity = 30;
                this.speed = 100;
                this.pollutionRate = 0.5;
                if (sprite) sprite.color = new Color(50, 50, 255); // Blue
                this.node.setScale(1.5, 1, 1);
                break;
            case VehicleType.BIKE:
                this.capacity = 1;
                this.speed = 80;
                this.pollutionRate = 0;
                if (sprite) sprite.color = new Color(50, 255, 50); // Green
                this.node.setScale(0.7, 0.7, 1);
                break;
        }
    }
}