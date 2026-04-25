# Explicação do Código `debug.py`

Este documento identifica os erros presentes em `debug.py`, explica a causa de cada um e mostra a correção aplicada para tornar o script funcional.

## Erros identificados e causas

1. **Texto de prompt não colocado entre aspas**
   - Linha com `item1 = float(input(Preço do item 1? ))` tenta usar um texto sem aspas dentro de `input()`.
   - Causa: Python interpreta `Preço` como um nome de variável, gerando um `SyntaxError`.
   - Correção: usar `input("Preço do item 1: ")`.

2. **Uso de string em vez de número para cálculo de desconto**
   - `desconto_cupom = (input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))` armazena texto.
   - Causa: `input()` sempre retorna string, então `desconto_cupom / 100` causa um `TypeError` ou comparação incorreta se usado em `if desconto_cupom > 0`.
   - Correção: converter para `float` ou `int`, por exemplo `float(input(...))`.

3. **Uso incorreto de string formatada**
   - `print(" Item 2:        R$ {total_item2:.2f}")` não é uma f-string.
   - Causa: a string é impressa literalmente com `{total_item2:.2f}` em vez do valor formatado.
   - Correção: usar `print(f" Item 2:        R$ {total_item2:.2f}")`.

4. **Indentação incorreta no bloco `if`**
   - O `print` dentro de `if desconto_cupom > 0:` está no mesmo nível de indentação do `if`.
   - Causa: Python exige indentação correta para blocos, então isso gera um `IndentationError`.
   - Correção: indentar o `print` em quatro espaços.

5. **Uso de `round` desnecessário dentro de f-string**
   - `print(f" TOTAL:         R$ {round(total, 2):.2f}")` funciona, mas é redundante.
   - Causa: `:.2f` já formata com duas casas decimais, então `round()` não é necessário.
   - Correção: usar `print(f" TOTAL:         R$ {total:.2f}")`.

## Código corrigido

Abaixo está a versão ajustada de `debug.py`, com os erros corrigidos:

```python
def main() -> None:
    # ENTRADA DE DADOS
    cliente = input("Qual é seu nome? ")

    qtd1 = int(input("Quantidade do item 1: "))
    item1 = float(input("Preço do item 1: "))

    qtd2 = int(input("Quantidade do item 2: "))
    item2 = float(input("Preço do item 2: "))

    qtd3 = int(input("Quantidade do item 3: "))
    item3 = float(input("Preço do item 3: "))

    # CÁLCULOS DOS ITENS
    total_item1 = qtd1 * item1
    total_item2 = qtd2 * item2
    total_item3 = qtd3 * item3

    subtotal = total_item1 + total_item2 + total_item3
    imposto = subtotal * 0.10

    # DESCONTO
    desconto_cupom = float(input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))
    desconto = subtotal * (desconto_cupom / 100)

    # TOTAL FINAL
    total = subtotal + imposto - desconto

    # EXIBIÇÃO
    linha = "=" * 31
    separador = "-" * 31

    print(linha)
    print(f" Cliente: {cliente}")
    print(linha)
    print(f" Item 1:        R$ {total_item1:.2f}")
    print(f" Item 2:        R$ {total_item2:.2f}")
    print(f" Item 3:        R$ {total_item3:.2f}")
    print(separador)
    print(f" Subtotal:      R$ {subtotal:.2f}")
    print(f" Imposto (10%): R$ {imposto:.2f}")

    if desconto_cupom > 0:
        print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")

    print(linha)
    print(f" TOTAL:         R$ {total:.2f}")
    print(linha)


if __name__ == "__main__":
    main()
```

## Resumo das correções

- Adicionado `main()` para organizar o fluxo do programa.
- Colocado o texto entre aspas nos prompts de `input()`.
- Convertido o valor do cupom para `float` antes do cálculo.
- Corrigido `print()` de `Item 2` para usar `f-string`.
- Corrigida a indentação do bloco `if desconto_cupom > 0:`.
- Simplificada a formatação final do total.

Com essas correções, o script agora é funcional e exibe corretamente o valor total com imposto e desconto.
