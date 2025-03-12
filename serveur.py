from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# Initial Pokémon stats
pokemon1 = {"name": "Pikachu", "hp": 100, "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"}
pokemon2 = {"name": "Charmander", "hp": 100, "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"}

@app.route('/')
def index():
    return render_template('index.html', pokemon1=pokemon1, pokemon2=pokemon2)

@app.route('/action', methods=['POST'])
def action():
    action_type = request.json.get('action_type')
    target = request.json.get('target')

    if action_type == 'attack':
        damage = random.randint(10, 30)
        if target == 'pokemon1':
            pokemon1['hp'] = max(0, pokemon1['hp'] - damage)
        else:
            pokemon2['hp'] = max(0, pokemon2['hp'] - damage)
    elif action_type == 'heal':
        heal = random.randint(10, 30)
        if target == 'pokemon1':
            pokemon1['hp'] = min(100, pokemon1['hp'] + heal)
        else:
            pokemon2['hp'] = min(100, pokemon2['hp'] + heal)
    elif action_type == 'nerf':
        nerf = random.randint(5, 15)
        if target == 'pokemon1':
            pokemon1['hp'] = max(0, pokemon1['hp'] - nerf)
        else:
            pokemon2['hp'] = max(0, pokemon2['hp'] - nerf)
    elif action_type == 'boost':
        boost = random.randint(5, 15)
        if target == 'pokemon1':
            pokemon1['hp'] = min(100, pokemon1['hp'] + boost)
        else:
            pokemon2['hp'] = min(100, pokemon2['hp'] + boost)

    return jsonify({"pokemon1_hp": pokemon1['hp'], "pokemon2_hp": pokemon2['hp']})

if __name__ == '__main__':
    app.run(debug=True)
