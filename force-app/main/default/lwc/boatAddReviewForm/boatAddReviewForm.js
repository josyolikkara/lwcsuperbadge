import { LightningElement,api,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/BoatReview__c.Name';
import COMMENT_FIELD from '@salesforce/schema/BoatReview__c.Comment__c';
import BOAT_REVIEW_OBJECT from '@salesforce/schema/BoatReview__c';

const SUCCESS_TITLE = 'Review Created!';
const SUCCESS_VARIANT = 'success';
export default class BoatAddReviewForm extends LightningElement {
    
    boatReviewObject = BOAT_REVIEW_OBJECT;
    nameField        = NAME_FIELD;
    commentField     = COMMENT_FIELD;
    labelSubject = 'Review Subject';
    labelRating  = 'Rating';
    @track boatId;
    @track rating = 0;
    @api 
    get recordId() {
        return this.boatId;
    }
    set recordId(value) {
        this.boatId = value;
    }
    handleRatingChanged(event) {
        this.rating = event.detail.rating;
    }
    handleSubmit(event){
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        fields.Boat__c = this.boatId;
        fields.Rating__c = this.rating;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }
    handleSuccess(event){
        this.dispatchEvent(
            new ShowToastEvent({
                title: SUCCESS_TITLE,
                variant: SUCCESS_VARIANT
            })
        );
        this.dispatchEvent(new CustomEvent('createreview'));
        this.handleReset();
    }
    handleReset() {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        
        this.rating = 0;
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
    }
     
}