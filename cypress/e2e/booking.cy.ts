const createNewBooking = () => {
  cy.getBySel('PropertyItem.BookButton').first().click();
  cy.getBySel('BookingForm.GuestsCountInput').clear().type('1');
  cy.getBySel('BookingForm.CheckInDatePicker').click();
  cy.get('.react-datepicker__navigation--next').click();
  cy.get('.react-datepicker__day').eq(-2).click();
  cy.get('.react-datepicker__day').eq(-1).click();
  cy.getBySel('BookingForm.SubmitButton').click();
};
describe('CRUD of booking', () => {
  beforeEach(() => {
    cy.visit('/');
    createNewBooking();
  });
  it('Can create booking with valid data', () => {
    cy.getBySel('BookingList.Item').first().should('exist');
  });
  it('Can delete booking', () => {
    cy.getBySel('BookingList.DeleteButton').first().click();
    cy.getBySel('BookingList.Item').should('not.exist');
  });
  it('Can edit booking', () => {
    cy.getBySel('BookingList.EditButton').first().click();
    cy.getBySel('BookingForm.GuestsCountInput').clear().type('5');
    cy.getBySel('BookingForm.CheckInDatePicker').click();
    cy.get('.react-datepicker__navigation--next').click();
    cy.get('.react-datepicker__day').eq(-2).click();
    cy.get('.react-datepicker__day').eq(-1).click();
  });
  it('Get error if bookings are overlapping ', () => {
    createNewBooking();
  });
});
