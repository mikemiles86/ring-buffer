var RingBuffer = function(size) {
  this.bufferSize = size
  this.buffer = new Array(size)
  this.bufferRead = this.bufferWrite = this.bufferCount = 0
}

RingBuffer.prototype.read = function() {
  var data = this.buffer[this.bufferRead]
  this.buffer[this.bufferRead++] = null
  this.bufferCount--
  if (this.bufferRead >= this.bufferSize) {
    this.bufferRead = 0
  }
  return data;
}

RingBuffer.prototype.write = function(data) {
  if ((this.bufferWrite == this.bufferRead) && (this.buffer[this.bufferRead+1] != null)) {
    this.bufferRead++
    if (this.bufferRead >= this.bufferSize) {
      this.bufferRead = 0
    }
  }

  this.buffer[this.bufferWrite++] = data
  this.bufferCount++;
  if (this.bufferWrite >= this.bufferSize) {
    this.bufferWrite = 0
  }
}

RingBuffer.prototype.count = function() {
  return this.bufferCount
}
