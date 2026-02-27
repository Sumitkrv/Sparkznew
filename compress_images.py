#!/usr/bin/env python3
"""
Image compression script for PR Sparkz reference images
Compresses images while maintaining quality
"""

from PIL import Image
import os

# Source and destination folders
source_folder = "public/Reference Images for PR SParkz"
dest_folder = "public/images/services"

# Create destination folder if it doesn't exist
os.makedirs(dest_folder, exist_ok=True)

# Image files to compress
images = [
    "AI Solutions.jpg",
    "Campaign Planning.jpg",
    "Celebrity Branding.jpg",
    "Digital Marketing.jpg",
    "Influencer Marketing.jpg",
    "Offline Marketing.jpg",
    "Social Media.jpg",
    "Web Development.jpg"
]

def compress_image(input_path, output_path, quality=85, max_width=1200):
    """
    Compress and resize image
    Args:
        input_path: Source image path
        output_path: Destination image path
        quality: JPEG quality (1-100)
        max_width: Maximum width in pixels
    """
    try:
        # Open image
        img = Image.open(input_path)
        
        # Convert RGBA to RGB if necessary
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background
        
        # Resize if width is greater than max_width
        if img.width > max_width:
            ratio = max_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
        
        # Save with compression
        img.save(output_path, 'JPEG', quality=quality, optimize=True)
        
        # Get file sizes
        original_size = os.path.getsize(input_path) / 1024  # KB
        compressed_size = os.path.getsize(output_path) / 1024  # KB
        savings = ((original_size - compressed_size) / original_size) * 100
        
        print(f"✓ {os.path.basename(input_path)}")
        print(f"  Original: {original_size:.1f} KB")
        print(f"  Compressed: {compressed_size:.1f} KB")
        print(f"  Savings: {savings:.1f}%")
        print()
        
    except Exception as e:
        print(f"✗ Error processing {input_path}: {str(e)}")
        print()

# Process all images
print("Starting image compression...\n")
print("=" * 50)
print()

for image_name in images:
    input_path = os.path.join(source_folder, image_name)
    output_path = os.path.join(dest_folder, image_name)
    
    if os.path.exists(input_path):
        compress_image(input_path, output_path, quality=85, max_width=1200)
    else:
        print(f"✗ File not found: {input_path}\n")

print("=" * 50)
print("Compression complete!")
print(f"Compressed images saved to: {dest_folder}")
