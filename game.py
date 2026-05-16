import pygame
import sys
import random
from settings import *
from sprites import Player, Asteroid, Projectile

def draw_text(surf, text, size, x, y):
    font = pygame.font.SysFont("arial", size, bold=True)
    text_surface = font.render(text, True, WHITE)
    text_rect = text_surface.get_rect()
    text_rect.midtop = (x, y)
    surf.blit(text_surface, text_rect)

def show_start_screen(screen, score=None):
    screen.fill(BLACK)
    if score is not None:
        draw_text(screen, "GAME OVER", 64, WIDTH / 2, HEIGHT / 4)
        draw_text(screen, f"Pontuação: {score}", 30, WIDTH / 2, HEIGHT / 2)
    else:
        draw_text(screen, "ATARI SPACE SHOOTER", 50, WIDTH / 2, HEIGHT / 4)
        draw_text(screen, "Setas: Mover | Espaço: Atirar", 30, WIDTH / 2, HEIGHT / 2)
    
    draw_text(screen, "Pressione qualquer tecla para jogar", 20, WIDTH / 2, HEIGHT * 3 / 4)
    pygame.display.flip()
    
    waiting = True
    while waiting:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYUP:
                waiting = False

def main():
    pygame.init()
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("Atari Space Shooter")
    clock = pygame.time.Clock()

    game_over = True
    running = True
    first_time = True
    score = 0

    while running:
        if game_over:
            if first_time:
                show_start_screen(screen)
                first_time = False
            else:
                show_start_screen(screen, score)
                
            game_over = False
            score = 0
            
            # Recria os grupos de sprites
            all_sprites = pygame.sprite.Group()
            asteroids = pygame.sprite.Group()
            projectiles = pygame.sprite.Group()
            
            player = Player()
            all_sprites.add(player)

        # Controla a velocidade do loop
        clock.tick(FPS)

        # 1 - Processamento de Eventos
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    player.shoot(all_sprites, projectiles)

        # 2 - Atualização
        all_sprites.update()

        # Cálculo da dificuldade atual com base na pontuação
        level = score // SCORE_PER_LEVEL
        speed_multiplier = min(1.0 + level * SPEED_INCREASE_PER_LEVEL, MAX_SPEED_MULTIPLIER)
        current_spawn_rate = max(SPAWN_RATE - level * SPAWN_RATE_DECREASE_PER_LEVEL, MIN_SPAWN_RATE)

        # Spawn de asteroides (frequência e velocidade escalam com o nível)
        if random.randrange(100) < (100 / current_spawn_rate):
            asteroid = Asteroid(speed_multiplier=speed_multiplier)
            all_sprites.add(asteroid)
            asteroids.add(asteroid)

        # Verifica se algum asteroide passou do fundo da tela
        for asteroid in asteroids:
            if asteroid.rect.top > HEIGHT:
                game_over = True

        # Verifica colisões: Tiro acertou Asteroide
        # groupcollide(group1, group2, dokill1, dokill2)
        hits = pygame.sprite.groupcollide(asteroids, projectiles, True, True)
        for hit in hits:
            score += 10

        # Verifica colisões: Asteroide acertou Player
        # spritecollide(sprite, group, dokill)
        hits = pygame.sprite.spritecollide(player, asteroids, False)
        if hits:
            game_over = True

        # 3 - Renderização
        screen.fill(BLACK)
        all_sprites.draw(screen)
        draw_text(screen, f"Pontos: {score}", 36, WIDTH / 2, 10)
        draw_text(screen, f"Nível: {level + 1}", 22, WIDTH - 80, 10)

        # Atualiza a tela
        pygame.display.flip()

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
