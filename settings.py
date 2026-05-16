# settings.py

# Dimensões da tela
WIDTH = 800
HEIGHT = 600
FPS = 60

# Cores (RGB)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)

# Configurações do Player
PLAYER_WIDTH = 50
PLAYER_HEIGHT = 30
PLAYER_SPEED = 8
PLAYER_COLOR = GREEN

# Configurações do Tiro (Projétil)
PROJECTILE_WIDTH = 5
PROJECTILE_HEIGHT = 15
PROJECTILE_SPEED = 10
PROJECTILE_COLOR = YELLOW

# Configurações dos Asteroides
ASTEROID_MIN_SIZE = 20
ASTEROID_MAX_SIZE = 50
ASTEROID_MIN_SPEED = 1   # Velocidade mínima inicial (bem lenta)
ASTEROID_MAX_SPEED = 3   # Velocidade máxima inicial (suave)
ASTEROID_COLOR = RED
SPAWN_RATE = 60  # Frequência de spawn inicial (maior = mais espaçado)

# Configurações de dificuldade progressiva
# A cada SCORE_PER_LEVEL pontos, a dificuldade sobe 1 nível
SCORE_PER_LEVEL = 50
# Fator de aumento de velocidade por nível (multiplicador)
SPEED_INCREASE_PER_LEVEL = 0.25
# Limite máximo do multiplicador de velocidade
MAX_SPEED_MULTIPLIER = 4.0
# A cada nível, o spawn_rate diminui este valor (gera mais asteroides)
SPAWN_RATE_DECREASE_PER_LEVEL = 5
# Spawn rate mínimo (máximo de asteroides possível)
MIN_SPAWN_RATE = 15
