const addPoints = (receipt) => {
  let points = 0;
  const { retailer, purchaseDate, purchaseTime, items, total } = receipt;
  //One point for every alphanumeric character in the retailer name.
  points += retailer.match(/[a-zA-Z0-9]+/g).join('').length;

  //   6 points if the day in the purchase date is odd.
  if (Number(purchaseDate.split('-')[2]) % 2 !== 0) {
    points += 6;
  }
  //   10 points if the time of purchase is after 2:00pm and before 4:00pm.
  const hour = purchaseTime.split(':')[0];
  if (hour >= 14 && hour < 16 && purchaseTime !== '14:00') {
    points += 10;
  }
  // 5 points for every two items on the receipt.
  points += 5 * Math.floor(items.length / 2);

  //   If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
  items.forEach((item) => {
    if (item['shortDescription'].trim().length % 3 === 0) {
      points += Math.ceil(Number(item['price']) * 0.2);
    }
  });
  //   50 points if the total is a round dollar amount with no cents.
  //   25 points if the total is a multiple of 0.25.
  const cents = total.slice(-2);
  if (cents === '25' && cents === '50' && cents === '75') {
    points += 25;
  }
  if (cents === '00') {
    points += 75;
  }
  return points;
};

function generateID(receiptData) {
  const receiptJSON = JSON.stringify(receiptData);

  const hash = receiptJSON
    .split('')
    .reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) & 0xffffffff, 0);
  return [
    hash >>> 0, // Ensure it's a positive integer
    hash >>> 0, // Duplicate for the same reason
    0x4000 | (0x0fff & (hash >>> 16)), // Set the 4th character
    0x8000 | (0x3fff & (hash >>> 18)), // Set the 13th character
    hash >>> 32, // Last 32 bits
  ]
    .map((part) => part.toString(16).padStart(8, '0'))
    .join('-');
}

module.exports = { addPoints, generateID };
