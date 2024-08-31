class Shop {
  constructor(shopId, name, category, locatedCity, phoneNumber, locationLink) {
    this.shopId = shopId;
    this.name = name;
    this.category = category;
    this.locatedCity = locatedCity;
    this.phoneNumber = phoneNumber;
    this.locationLink = locationLink;
  }

  // Method to return shop details as a string
  getDetails() {
    return `Shop [ID: ${this.shopId}, Name: ${this.name}, Category: ${this.category}, Located in: ${this.locatedCity}, Phone: ${this.phoneNumber}, Location Link: ${this.locationLink}]`;
  }
}

module.exports = Shop;
