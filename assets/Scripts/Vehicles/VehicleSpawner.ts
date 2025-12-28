import { _decorator, Component, Prefab, instantiate, Vec3, Node } from 'cc';
import { Vehicle, VehicleType } from './Vehicle';
const { ccclass, property } = _decorator;

@ccclass('VehicleSpawner')
export class VehicleSpawner extends Component {
    @property(Prefab)
    vehiclePrefab: Prefab = null;
    
    @property(Node)
    spawnPoint: Node = null;
    
    @property(Node)
    destination: Node = null;
    
    @property
    autoSpawn: boolean = true;
    
    @property
    spawnInterval: number = 2.0;

    private timer: number = 0;

    update(deltaTime: number) {
        if (!this.autoSpawn) return;
        
        this.timer += deltaTime;
        
        if (this.timer >= this.spawnInterval) {
            this.timer = 0;
            
            const rand = Math.random();
            if (rand < 0.5) {
                this.spawnVehicle(VehicleType.CAR);
            } else if (rand < 0.8) {
                this.spawnVehicle(VehicleType.BUS);
            } else {
                this.spawnVehicle(VehicleType.BIKE);
            }
        }
    }

    public spawnVehicle(type: VehicleType) {
        if (!this.vehiclePrefab || !this.spawnPoint || !this.destination) {
            console.log("Missing prefab or points!");
            return;
        }
        
        const vehicle = instantiate(this.vehiclePrefab);
        vehicle.setParent(this.node.scene);
        vehicle.setPosition(this.spawnPoint.getWorldPosition());
        
        const vehicleComp = vehicle.getComponent(Vehicle);
        if (vehicleComp) {
            vehicleComp.setupVehicle(type);
            vehicleComp.moveTo(this.destination.getWorldPosition());
        }
    }
}