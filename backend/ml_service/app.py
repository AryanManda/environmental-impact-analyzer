from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
import json
import os

app = Flask(__name__)
CORS(app)

# Mock environmental impact data
IMPACT_DATA = {
    'plastic': {'carbon': 0.8, 'water': 0.3, 'energy': 0.7, 'recyclability': 0.2},
    'cotton': {'carbon': 0.4, 'water': 0.8, 'energy': 0.3, 'recyclability': 0.7},
    'metal': {'carbon': 0.6, 'water': 0.4, 'energy': 0.8, 'recyclability': 0.9},
    'paper': {'carbon': 0.3, 'water': 0.5, 'energy': 0.4, 'recyclability': 0.8},
    'glass': {'carbon': 0.5, 'water': 0.6, 'energy': 0.6, 'recyclability': 0.9},
}

def analyze_product(product_name, description=None):
    # Simple keyword-based analysis
    text = f"{product_name} {description or ''}".lower()
    
    # Calculate impact scores based on materials mentioned
    scores = {
        'carbonFootprint': 0,
        'waterUsage': 0,
        'energyConsumption': 0,
        'recyclability': 0
    }
    
    material_count = 0
    for material, impacts in IMPACT_DATA.items():
        if material in text:
            material_count += 1
            scores['carbonFootprint'] += impacts['carbon']
            scores['waterUsage'] += impacts['water']
            scores['energyConsumption'] += impacts['energy']
            scores['recyclability'] += impacts['recyclability']
    
    if material_count > 0:
        for key in scores:
            scores[key] = int((scores[key] / material_count) * 100)
    
    # Generate suggestions based on scores
    suggestions = []
    if scores['carbonFootprint'] > 70:
        suggestions.append("Consider using materials with lower carbon footprint")
    if scores['waterUsage'] > 70:
        suggestions.append("Look for water-efficient manufacturing processes")
    if scores['energyConsumption'] > 70:
        suggestions.append("Consider energy-efficient alternatives")
    if scores['recyclability'] < 30:
        suggestions.append("Choose more recyclable materials")
    
    if not suggestions:
        suggestions.append("This product has relatively good environmental impact")
    
    return {
        'score': int(np.mean(list(scores.values()))),
        'breakdown': scores,
        'suggestions': suggestions
    }

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    product_name = data.get('productName', '')
    description = data.get('description', '')
    
    result = analyze_product(product_name, description)
    return jsonify(result)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port) 