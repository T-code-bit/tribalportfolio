from PIL import Image, ImageDraw, ImageFont

def create_logo(text, filename, color):
    # Create a white background image
    image = Image.new('RGB', (300, 150), color='white')
    draw = ImageDraw.Draw(image)
    
    # Use a default font
    try:
        font = ImageFont.truetype("arial.ttf", 60)
    except IOError:
        font = ImageFont.load_default()
    
    # Get text size
    text_width, text_height = draw.textsize(text, font=font)
    
    # Calculate position to center the text
    position = ((300 - text_width) / 2, (150 - text_height) / 2)
    
    # Draw text
    draw.text(position, text, fill=color, font=font)
    
    # Save image
    image.save(f'C:/Users/Admin/TRIBAL PORTFOLIO/assets/images/learning-platforms/{filename}')

# Create logos
create_logo('Coursera', 'coursera-logo.png', (0, 116, 186))  # Coursera blue
create_logo('Udacity', 'udacity-logo.png', (34, 34, 34))     # Dark gray
create_logo('edX', 'edx-logo.png', (0, 170, 90))             # edX green
create_logo('Pluralsight', 'pluralsight-logo.png', (239, 83, 80))  # Pluralsight red
