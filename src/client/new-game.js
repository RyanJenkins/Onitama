;(function() {
  requirejs([
    'd3',
    'cards',
    'client-utils'
  ], function(d3, cards, {rectify, drawCard}) {
    const cardList = d3.select('#card-select-list'),
      cardInputs = d3.select('#card-selection-inputs');
    var selection = cards.deck.map(c => c.group === 'Arcane Wonders');

    function rectifySelection(cardSelection, cardList) {
      rectify(cardList, 'svg', selection,
        selection => selection.each((data, i, nodes) => {
          const svg = d3.select(nodes[i])
            .attr('viewBox', '-5 -5 260 135')
            .style('width', '250px')
            .on('click', () => {
              cardSelection[i] = !cardSelection[i];
              rectifySelection(cardSelection, cardList);
            });


          drawCard(svg, cards.deck[i]);

          svg.select('.background')
            .attr('stroke', data ? 'green' : 'black')
            .attr('stroke-width', data ? 5 : 1);
        }));

      rectify(cardInputs, 'input', selection,
        selection => selection
          .attr('type', 'checkbox')
          .attr('name', 'card-id')
          .attr('value', (d, i) => cards.deck[i].getId())
          .property('checked', d => d ))
    }

    rectifySelection(selection, cardList);
  });
})();
