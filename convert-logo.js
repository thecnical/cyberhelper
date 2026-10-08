const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Read SVG file
const svgPath = path.join(__dirname, 'assets', 'logo.svg');
const svgBuffer = fs.readFileSync(svgPath);

// Create assets directory if it doesn't exist
const outputDir = path.join(__dirname, 'assets');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Sizes to generate
const sizes = [
  { width: 512, height: 512, name: 'logo-512.png' },
  { width: 256, height: 256, name: 'logo-256.png' },
  { width: 128, height: 128, name: 'logo-128.png' },
  { width: 64, height: 64, name: 'logo-64.png' },
];

// Convert to PNG at different sizes
async function convertLogos() {
  console.log('Converting SVG to PNG...');

  for (const size of sizes) {
    const outputPath = path.join(outputDir, size.name);

    try {
      await sharp(svgBuffer)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(outputPath);

      console.log(`✓ Created ${size.name} (${size.width}x${size.height})`);
    } catch (error) {
      console.error(`✗ Failed to create ${size.name}:`, error.message);
    }
  }

  console.log('\n✨ Logo conversion complete!');
}

convertLogos().catch(console.error);
