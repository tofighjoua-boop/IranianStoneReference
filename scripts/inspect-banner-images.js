const fs = require('fs');
const path = require('path');

const files = [
  'public/images/banner-1.jpg',
  'public/images/banner-2.jpg',
  'public/images/banner-3.jpg',
  'public/images/banner-4.jpg',
  'public/images/banner-5.jpg',
  'public/images/banner-6.jpg',
  'public/images/bottom-banner-1.jpg',
  'public/images/bottom-banner-2.jpg',
  'public/images/bottom-banner-3.jpg',
];

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function parseJPEG(file) {
  const data = fs.readFileSync(file);
  let width = null;
  let height = null;
  let dpi = null;
  let i = 2;

  while (i < data.length) {
    if (data[i] !== 0xff) {
      i += 1;
      continue;
    }

    const marker = data[i + 1];

    if (marker === 0xe0) {
      const length = data.readUInt16BE(i + 2);
      if (data.slice(i + 4, i + 9).toString() === 'JFIF\x00') {
        const densityUnits = data[i + 9];
        const x = data.readUInt16BE(i + 10);
        const y = data.readUInt16BE(i + 12);
        dpi = densityUnits === 1 ? `${x}x${y} dpi` : densityUnits === 2 ? `${x}x${y} dpcm` : null;
      }
      i += 2 + length;
      continue;
    }

    if (marker >= 0xc0 && marker <= 0xc3) {
      height = data.readUInt16BE(i + 5);
      width = data.readUInt16BE(i + 7);
      break;
    }

    if (marker === 0xda || marker === 0xd9) {
      break;
    }

    const length = data.readUInt16BE(i + 2);
    if (!length || length < 2) {
      break;
    }
    i += 2 + length;
  }

  return { width, height, dpi };
}

console.log('Name\tFormat\tDimensions\tSize\tDPI\tAspect');
for (const rel of files) {
  const file = path.resolve(rel);
  if (!fs.existsSync(file)) {
    console.log(`${path.basename(file)}\tMISSING`);
    continue;
  }

  const stat = fs.statSync(file);
  const { width, height, dpi } = parseJPEG(file);
  const ratio = width && height ? `${width / gcd(width, height)}:${height / gcd(width, height)}` : 'unknown';
  console.log(`${path.basename(file)}\tJPEG\t${width}x${height}\t${stat.size} bytes (${(stat.size / 1024).toFixed(1)} KB)\t${dpi || 'None'}\t${ratio}`);
}
