from PIL import Image, ImageDraw, ImageFont

# Create a new image with a transparent background
width, height = 500, 500
image = Image.new('RGBA', (width, height), (0, 0, 0, 0))

# Create a drawing context
draw = ImageDraw.Draw(image)

# Load a font
font = ImageFont.truetype("arial.ttf", 300)

# Draw the letter 'T'
draw.text((150, 100), 'T', font=font, fill=(255, 255, 255, 255))

# Save the image
image.save('C:/Users/Admin/TRIBAL PORTFOLIO/assets/avatar.png')
