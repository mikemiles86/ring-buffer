
function testOne() {

// Load test, read in order, with a random capacity between 9mm-10mm
  var min = 999990,
      max = 1000000,
      random_capacity = Math.floor(Math.random() * (max - min + 1)) + min;

  var ring = new RingBuffer(random_capacity)

 var start = new Date().getTime()

  // Fill must fill the random capacity
  for ( var x = 0; x < random_capacity; x ++){
    ring.write(x)
  }

  // Read the random capacity, in order
  for ( var y = 0; y < random_capacity; y ++){
    ring.read();
  }

  var end = new Date().getTime();

  console.log('Test passed, ' + random_capacity + ' executions in ' + (end - start) + 'ms' )
}


function testTwo() {
  var ring = new RingBuffer(2)
  ring.write(1)
  var readerA = ring.join()
  var readerB = ring.join()
  if (readerA.read() != 1) {
    console.log('Test Failed, Reader A incorrect read(1)');
    return
  }
  if (readerB.read() != 1) {
    console.log('Test Failed, Reader A incorrect read(1)');
    return
  }
  ring.write(2)
  if (readerA.read() != 2) {
    console.log('Test Failed, Reader A incorrect read(2)');
    return
  }
  if (readerB.read() != 2) {
    console.log('Test Failed, Reader A incorrect read(2)');
    return
  }

  console.log('Test passed');
}

function testThree() {
  var ring = new RingBuffer(2)
  ring.write(1)
  ring.write(2)
  var readerA = ring.join()
  if (readerA.read() != 1) {
    console.log('Test Failed, Reader A incorrect read(1)');
    return
  }
  if (readerA.read() != 2) {
    console.log('Test Failed, Reader A incorrect read(2)');
    return
  }
  var readerB = ring.join()
  if (readerB.read() != 1) {
    console.log('Test Failed, Reader B incorrect read(1)');
    return
  }
  if (readerB.read() != 2) {
    console.log('Test Failed, Reader B incorrect read(2)');
    return
  }
  console.log('Test passed');
}

function testFour() {
  var ring = new RingBuffer(2)
  ring.write(1)
  ring.write(2)
  var readerA = ring.join()
  if (readerA.read() != 1) {
    console.log('Test Failed, Reader A incorrect read(1)');
    return
  }
  if (readerA.read() != 2) {
    console.log('Test Failed, Reader A incorrect read(2)');
    return
  }
  ring.write(3)
  var readerB = ring.join()
  if (readerB.read() != 2) {
    console.log('Test Failed, Reader B incorrect read(2)');
    return
  }
  if (readerB.read() != 3) {
    console.log('Test Failed, Reader B incorrect read(3)');
    return
  }
   if (readerA.read() != 3) {
    console.log('Test Failed, Reader A incorrect read(3)');
    return
  }
  console.log('Test passed');
}

function testFive() {
  var ring = new RingBuffer(2)
  ring.write(1)
  ring.write(2)
  var readerA = ring.join()
  if (readerA.read() != 1) {
    console.log('Test Failed, Reader A incorrect read(1)');
    return
  }
  if (readerA.read() != 2) {
    console.log('Test Failed, Reader A incorrect read(2)');
    return
  }
  ring.write(3)
  if (readerA.read() != 3) {
    console.log('Test Failed, Reader A incorrect read(3)');
    return
  }
  if (readerA.read() != null) {
    console.log('Test Failed, Reader A incorrect read(null)');
    return
  }
  console.log('Test passed');
}
