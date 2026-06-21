'use strict';

const tooltipElements = document.querySelectorAll('.has-tooltip');
let activeTooltip = null;

function createTooltip(element) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = element.getAttribute('title');
  document.body.appendChild(tooltip);
  return tooltip;
}

function getTooltipPosition(element, tooltip) {
  const elementRect = element.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const position = element.getAttribute('data-position') || 'bottom';
  let left, top;

  switch (position) {
    case 'top':
      left = elementRect.left + (elementRect.width / 2) - (tooltipRect.width / 2);
      top = elementRect.top - tooltipRect.height - 10;
      break;
    case 'left':
      left = elementRect.left - tooltipRect.width - 10;
      top = elementRect.top + (elementRect.height / 2) - (tooltipRect.height / 2);
      break;
    case 'right':
      left = elementRect.right + 10;
      top = elementRect.top + (elementRect.height / 2) - (tooltipRect.height / 2);
      break;
    case 'bottom':
    default:
      left = elementRect.left + (elementRect.width / 2) - (tooltipRect.width / 2);
      top = elementRect.top + elementRect.height + 10;
      break;
  }

  return { left, top };
}

function showTooltip(element) {
  if (activeTooltip) {
    activeTooltip.classList.remove('tooltip_active');
    if (activeTooltip.parentNode) {
      activeTooltip.parentNode.removeChild(activeTooltip);
    }
    activeTooltip = null;
  }

  const tooltip = createTooltip(element);
  const position = getTooltipPosition(element, tooltip);
  tooltip.style.left = position.left + 'px';
  tooltip.style.top = position.top + 'px';
  tooltip.classList.add('tooltip_active');
  activeTooltip = tooltip;
}

tooltipElements.forEach(function(element) {
  element.addEventListener('click', function(event) {
    event.preventDefault();
    showTooltip(element);
  });
});

document.addEventListener('click', function(event) {
  if (activeTooltip && !event.target.classList.contains('has-tooltip')) {
    activeTooltip.classList.remove('tooltip_active');
    if (activeTooltip.parentNode) {
      activeTooltip.parentNode.removeChild(activeTooltip);
    }
    activeTooltip = null;
  }
});

window.addEventListener('scroll', function() {
  if (activeTooltip) {
    const element = document.querySelector('.has-tooltip.tooltip-active');
    if (element) {
      const position = getTooltipPosition(element, activeTooltip);
      activeTooltip.style.left = position.left + 'px';
      activeTooltip.style.top = position.top + 'px';
    }
  }
});
