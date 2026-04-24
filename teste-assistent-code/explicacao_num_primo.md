# Explicação da Função `is_primo` em Python

Este documento explica o código Python presente no arquivo `num_primos.py`, que contém uma função para verificar se um número é primo.

## Código Python

```python
def is_primo(numero):
    """
    Verifica se um número é primo.
    
    Args:
        numero (int): O número a ser verificado
        
    Returns:
        bool: True se o número é primo, False caso contrário
    """
    # Números menores ou iguais a 1 não são primos
    if numero <= 1:
        return False
    
    # 2 é o único número primo par
    if numero == 2:
        return True
    
    # Números pares maiores que 2 não são primos
    if numero % 2 == 0:
        return False
    
    # Verifica divisibilidade por números ímpares até a raiz quadrada
    for i in range(3, int(numero ** 0.5) + 1, 2):
        if numero % i == 0:
            return False
    
    return True


# Exemplos de uso
if __name__ == "__main__":
    # Testando a função
    numeros_teste = [2, 3, 4, 5, 10, 17, 20, 29, 30]
    
    for num in numeros_teste:
        resultado = is_primo(num)
        print(f"{num} é primo? {resultado}")
```

## Explicação Detalhada

### Definição da Função
- **`def is_primo(numero):`** Define uma função chamada `is_primo` que recebe um parâmetro `numero` (inteiro).
- A função retorna `True` se o número for primo e `False` caso contrário.

### Docstring
- A docstring explica o propósito da função, seus argumentos e valor de retorno.

### Lógica da Função

1. **Verificação Inicial:**
   - Se `numero <= 1`, retorna `False` porque números menores ou iguais a 1 não são primos.

2. **Caso Especial para 2:**
   - O número 2 é primo, pois é o único número primo par.

3. **Eliminação de Pares:**
   - Se o número for par e maior que 2, não é primo (exceto 2, já tratado).

4. **Loop de Verificação:**
   - Percorre números ímpares de 3 até a raiz quadrada do número (inclusive).
   - Para cada `i`, verifica se `numero % i == 0`. Se sim, não é primo.
   - Usa `range(3, int(numero ** 0.5) + 1, 2)` para pular números pares, otimizando o processo.

5. **Retorno Final:**
   - Se nenhum divisor for encontrado, retorna `True`.

### Exemplos de Uso
- O bloco `if __name__ == "__main__":` garante que o código de teste só execute quando o arquivo for executado diretamente.
- Testa a função com uma lista de números e imprime os resultados.

### Eficiência
- A verificação até a raiz quadrada reduz significativamente o número de operações, tornando o algoritmo eficiente para números grandes.

### Casos de Teste
- **Primos:** 2, 3, 5, 17, 29
- **Não primos:** 4, 10, 20, 30 (pares), 1 (menor que 2)

Esta implementação é uma solução clássica e eficiente para verificar números primos em Python.
