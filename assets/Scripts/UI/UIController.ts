import { _decorator, Component, Button } from 'cc';
import { VehicleSpawner } from '../Vehicles/VehicleSpawner';
import { VehicleType } from '../Vehicles/Vehicle';
import { GameManager } from '../Game/GameManager';
const { ccclass, property } = _decorator;

@ccclass('UIController')
export class UIController extends Component {
    @property(Button)
    spawnCarBtn: Button = null;
    
    @property(Button)
    spawnBusBtn: Button = null;
    
    @property(Button)
    spawnBikeBtn: Button = null;
    
    @property(VehicleSpawner)
    spawner: VehicleSpawner = null;

    start() {
        if (this.spawnCarBtn) {
            this.spawnCarBtn.node.on('click', this.onSpawnCar, this);
        }
        if (this.spawnBusBtn) {
            this.spawnBusBtn.node.on('click', this.onSpawnBus, this);
        }
        if (this.spawnBikeBtn) {
            this.spawnBikeBtn.node.on('click', this.onSpawnBike, this);
        }
    }

    private onSpawnCar() {
        if (GameManager.getInstance().spendCarbon(50)) {
            this.spawner.spawnVehicle(VehicleType.CAR);
        }
    }

    private onSpawnBus() {
        if (GameManager.getInstance().spendCarbon(100)) {
            this.spawner.spawnVehicle(VehicleType.BUS);
        }
    }

    private onSpawnBike() {
        if (GameManager.getInstance().spendCarbon(20)) {
            this.spawner.spawnVehicle(VehicleType.BIKE);
        }
    }
}