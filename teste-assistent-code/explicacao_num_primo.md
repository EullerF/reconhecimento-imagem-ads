# Explicação da Função `is_prime` em Python

Este documento explica o código Python presente no arquivo `num_primos.py`, que contém uma função para verificar se um número é primo, seguindo os princípios de Clean Code.

## Código Python

```python
from typing import List

def is_prime(number: int) -> bool:
    """
    Verifica se um número é primo.

    Um número primo é um número natural maior que 1 que não tem
    divisores positivos além de 1 e ele mesmo.

    Args:
        number (int): O número a ser verificado. Deve ser um inteiro não negativo.

    Returns:
        bool: True se o número for primo, False caso contrário.

    Raises:
        ValueError: Se o número for negativo.

    Examples:
        >>> is_prime(2)
        True
        >>> is_prime(4)
        False
    """
    if number < 0:
        raise ValueError("Número deve ser não negativo")
    
    if number <= 1:
        return False
    
    if number == 2:
        return True
    
    if number % 2 == 0:
        return False
    
    # Verifica divisibilidade por números ímpares até a raiz quadrada
    max_divisor = int(number ** 0.5) + 1
    for divisor in range(3, max_divisor, 2):
        if number % divisor == 0:
            return False
    
    return True

def main() -> None:
    """Função principal para testar a função is_prime."""
    test_numbers: List[int] = [2, 3, 4, 5, 10, 17, 20, 29, 30]
    
    for num in test_numbers:
        result = is_prime(num)
        print(f"{num} é primo? {result}")

if __name__ == "__main__":
    main()
```

## Explicação Detalhada

### Importações
- **`from typing import List`**: Importa o tipo `List` para type hints, melhorando a legibilidade e permitindo verificação de tipos.

### Definição da Função
- **`def is_prime(number: int) -> bool:`** Define uma função chamada `is_prime` que recebe um parâmetro `number` (inteiro) e retorna um booleano. O nome em inglês segue convenções de Clean Code para nomes descritivos.

### Docstring
- A docstring detalhada inclui descrição, argumentos, retorno, exceções e exemplos, seguindo o padrão Google ou NumPy para documentação.

### Validação de Entrada
- **`if number < 0: raise ValueError(...)`**: Valida se o número é não negativo, lançando uma exceção clara se inválido.

### Lógica da Função

1. **Verificação Inicial:**
   - Se `number <= 1`, retorna `False` porque números menores ou iguais a 1 não são primos.

2. **Caso Especial para 2:**
   - O número 2 é primo, pois é o único número primo par.

3. **Eliminação de Pares:**
   - Se o número for par e maior que 2, não é primo (exceto 2, já tratado).

4. **Loop de Verificação:**
   - Calcula `max_divisor = int(number ** 0.5) + 1` para clareza.
   - Percorre `divisor` de 3 até `max_divisor` em passos de 2 (números ímpares).
   - Verifica se `number % divisor == 0`. Se sim, não é primo.

5. **Retorno Final:**
   - Se nenhum divisor for encontrado, retorna `True`.

### Função `main`
- **`def main() -> None:`**: Função separada para o código de teste, seguindo o princípio de responsabilidade única.
- Usa type hints para a lista `test_numbers: List[int]`.
- Imprime os resultados dos testes.

### Execução Condicional
- **`if __name__ == "__main__": main()`**: Garante que o teste só execute quando o arquivo for executado diretamente, permitindo importação sem executar o código de teste.

### Princípios de Clean Code Aplicados
- **Nomes Descritivos:** `is_prime` em vez de `is_primo`, `number` em vez de `numero`, `divisor` em vez de `i`.
- **Type Hints:** Especificam tipos para parâmetros e retornos.
- **Separação de Responsabilidades:** Função `main` separada.
- **Validação de Entrada:** Verificação de números negativos.
- **Documentação Clara:** Docstring abrangente com exemplos.
- **Legibilidade:** Variáveis intermediárias como `max_divisor`.

### Eficiência
- A verificação até a raiz quadrada mantém a eficiência O(√n).
- Pula números pares no loop para otimização.

### Casos de Teste
- **Primos:** 2, 3, 5, 17, 29
- **Não primos:** 4, 10, 20, 30 (pares), 1 (menor que 2), números negativos (levantam erro)

Esta implementação segue boas práticas de Clean Code, sendo legível, manutenível e eficiente.
