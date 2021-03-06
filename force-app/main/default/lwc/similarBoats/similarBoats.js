import { LightningElement,api,track,wire } from 'lwc';
import getSimilarBoats  from '@salesforce/apex/BoatDataService.getSimilarBoats';
import { NavigationMixin } from 'lightning/navigation';

export default class SimilarBoats extends NavigationMixin(LightningElement) {
    // Private
    @track currentBoat;
    @track relatedBoats;
    boatId;
    @track error;
    
    // public
    @api
    get recordId() {
        // returns the boatId
        return this.boatId;
    }
    set recordId(value) {
        // sets the boatId value
        // sets the boatId attribute
        this.setAttribute('boatId', value);
        this.boatId = value;
    }
    
    // public
    @api similarBy;
    
    // Wire custom Apex call, using the import named getSimilarBoats
    // Populates the relatedBoats list
    @wire(getSimilarBoats, { boatId: '$boatId', similarBy: '$similarBy'})
    wiredsimilarBoats({ error, data }) {
        if (data) {
            this.relatedBoats = data;
            console.log(this.relatedBoats);
        } else if (error) {
            this.error = error;
            console.log(error);
        }
    }
    get getTitle() {
      return 'Similar boats by ' + this.similarBy;
    }
    get noBoats() {
      return !(this.relatedBoats && this.relatedBoats.length > 0);
    }
    
    // Navigate to record page
    openBoatDetailPage(event) {
        this.boatId = event.detail.boatId;
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
                recordId: this.boatId,
                actionName: "view"
            }
          });
    }
  }