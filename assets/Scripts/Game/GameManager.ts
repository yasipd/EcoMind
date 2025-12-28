import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Label)
    carbonLabel: Label = null;
    
    @property(Label)
    greenPointsLabel: Label = null;
    
    @property(Label)
    happinessLabel: Label = null;

    private carbonCredits: number = 1000;
    private greenPoints: number = 0;
    private happiness: number = 50;
    private pollution: number = 0;
    
    private static instance: GameManager = null;
    
    public static getInstance(): GameManager {
        return GameManager.instance;
    }

    onLoad() {
        GameManager.instance = this;
        this.updateUI();
    }

    start() {
        this.schedule(this.updatePollution, 1.0);
    }
    public addGreenPoints(points: number) {
        this.greenPoints += points;
        this.updateUI();
    }

    public addPollution(amount: number) {
        this.pollution += amount;
        this.carbonCredits -= amount * 0.5;
        this.happiness -= amount * 0.1;
        this.updateUI();
    }

    public reducePollution(amount: number) {
        this.pollution = Math.max(0, this.pollution - amount);
        this.happiness += amount * 0.05;
        this.updateUI();
    }

    public spendCarbon(amount: number): boolean {
        if (this.carbonCredits >= amount) {
            this.carbonCredits -= amount;
            this.updateUI();
            return true;
        }
        return false;
    }

    private updatePollution() {
        this.pollution *= 0.98;
        this.updateUI();
    }
    private updateUI() {
        if (this.carbonLabel) {
            this.carbonLabel.string = `Carbon: ${Math.floor(this.carbonCredits)}`;
        }
        if (this.greenPointsLabel) {
            this.greenPointsLabel.string = `Green: ${Math.floor(this.greenPoints)}`;
        }
        if (this.happinessLabel) {
            this.happinessLabel.string = `Happy: ${Math.floor(this.happiness)}%`;
        }
    }

    public getCarbonCredits(): number {
        return this.carbonCredits;
    }
}