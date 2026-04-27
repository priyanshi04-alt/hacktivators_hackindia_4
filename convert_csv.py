import csv
import json
import re

csv_path = r'C:\Users\Priyanshi\OneDrive\Desktop\updated_data.csv'
js_path = r'C:\Users\Priyanshi\OneDrive\Desktop\HACKTIVATORS\src\data\SchemesData.js'

def split_text(text):
    if not text: return []
    # Clean up step numbers or bullet points
    text = re.sub(r'Step \d+:', '', str(text))
    text = re.sub(r'\d+\.', '', text)
    sentences = [s.strip() for s in re.split(r'\.|\n', text) if len(s.strip()) > 10]
    return sentences[:6]  # Take max 6 points

data = []
counts = {
    'student': 0,
    'farmer': 0,
    'health': 0,
    'business': 0,
    'housing': 0,
    'other': 0
}

target_per_domain = 50

with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    next(reader)  # Skip header
    
    for row in reader:
        # Check if all targets are reached
        if (counts['student'] >= target_per_domain and 
            counts['farmer'] >= target_per_domain and 
            counts['health'] >= target_per_domain and 
            counts['business'] >= target_per_domain and 
            counts['housing'] >= target_per_domain and 
            counts['other'] >= target_per_domain):
            break
            
        if len(row) < 11: continue
        
        name = row[0]
        slug = row[1]
        details = row[2]
        benefits = row[3]
        eligibility = row[4]
        application = row[5]
        documents = row[6]
        category = row[8]
        tags = row[10]
        
        # Combined string for categorization
        search_str = (name + ' ' + category + ' ' + tags).lower()
        
        # Categorize
        cat = 'other'
        icon = 'FileText'
        
        if 'student' in search_str or 'education' in search_str or 'scholarship' in search_str or 'school' in search_str or 'university' in search_str:
            cat = 'student'
            icon = 'GraduationCap'
        elif 'farm' in search_str or 'agriculture' in search_str or 'crop' in search_str or 'krishi' in search_str:
            cat = 'farmer'
            icon = 'Wheat'
        elif 'health' in search_str or 'medical' in search_str or 'disease' in search_str or 'hospital' in search_str:
            cat = 'health'
            icon = 'Heart'
        elif 'business' in search_str or 'entrepreneur' in search_str or 'msme' in search_str or 'industry' in search_str or 'startup' in search_str:
            cat = 'business'
            icon = 'Briefcase'
        elif 'housing' in search_str or 'building' in search_str or 'construction' in search_str or 'awas' in search_str:
            cat = 'housing'
            icon = 'Home'
            
        # Only add if we need more in this category
        if counts[cat] >= target_per_domain:
            continue
            
        short_benefit = benefits.split('.')[0] if benefits else 'Check details for benefits'
        if len(short_benefit) > 40: short_benefit = short_benefit[:37] + '...'
        
        obj = {
            'id': slug,
            'title': name,
            'benefit': short_benefit,
            'target': category if category else 'General',
            'icon': icon,
            'category': cat,
            'eligibility': {
                'minAge': 18,
                'maxAge': 60,
                'maxIncome': 500000
            },
            'details': {
                'eligibility': split_text(eligibility),
                'benefits': split_text(benefits),
                'documents': split_text(documents),
                'apply': split_text(application)
            },
            'detailsHindi': {
                'eligibility': split_text(eligibility),
                'benefits': split_text(benefits),
                'documents': split_text(documents),
                'apply': split_text(application)
            },
            'simpleExplanation': details[:250] + '...' if details else 'Detailed explanation is available inside.'
        }
        
        data.append(obj)
        counts[cat] += 1

js_content = "import { GraduationCap, Wheat, Heart, Home, Briefcase, FileText } from 'lucide-react';\n\n"
js_content += "export const schemesData = [\n"

for item in data:
    icon_val = item['icon']
    del item['icon']
    json_str = json.dumps(item, indent=2)
    # Inject icon reference directly
    json_str = json_str.replace('"category":', f'icon: {icon_val},\n    "category":')
    js_content += json_str + ",\n"

js_content += "];\n"

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f'Successfully imported {len(data)} schemes to {js_path}!')
for k, v in counts.items():
    print(f'  {k}: {v}')
