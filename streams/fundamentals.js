import { Readable, Transform, Writable } from 'node:stream';

class OneToHundred extends Readable {
  index = 1;

  _read() {
    const number = this.index++;

    setTimeout(() => {
      if (number > 100) {
        this.push(null);
      } else {
        this.push(`${number}\n`);
      }
    }, 100);
  }
}

class InverseNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, `${Buffer.from(String(transformed))}\n`);
  }
}

class MultiplyByTen extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

// new OneToHundred().pipe(process.stdout);
// new OneToHundred().pipe(new MultiplyByTen());
new OneToHundred().pipe(new InverseNumber()).pipe(new MultiplyByTen());
