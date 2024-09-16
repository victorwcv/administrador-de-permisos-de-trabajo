export const handleWheel = (
  event: React.WheelEvent,
  scrollRef: React.RefObject<HTMLDivElement>
) => {
  if (scrollRef.current) {
    const container = scrollRef.current;

    const atTop = container.scrollTop === 0;
    const atBottom =
      container.scrollTop + container.clientHeight >= container.scrollHeight;
    const atLeft = container.scrollLeft === 0;
    const atRight =
      container.scrollLeft + container.clientWidth >= container.scrollWidth;

    // Si el usuario aún puede desplazarse en Y hacia arriba o hacia abajo
    if (!atBottom && event.deltaY > 0) {
      return; // Deja que el scroll siga en el eje Y hacia abajo
    }
    if (!atTop && event.deltaY < 0) {
      return; // Deja que el scroll siga en el eje Y hacia arriba
    }

    // Si el scroll Y ha llegado al límite, desplazamos en el eje X
    if ((atBottom && event.deltaY > 0) || (atTop && event.deltaY < 0)) {
      container.scrollLeft += event.deltaY; // Usa deltaY para mover el eje X
      // event.preventDefault(); // Evita el desplazamiento predeterminado en el eje Y
    }

    // Para mover en el eje X hacia atrás o adelante
    if (atRight && event.deltaY < 0) {
      container.scrollTop += event.deltaY; // Si estamos en el borde derecho, mover hacia arriba
      // event.preventDefault();
    } else if (atLeft && event.deltaY > 0) {
      container.scrollTop += event.deltaY; // Si estamos en el borde izquierdo, mover hacia abajo
      // event.preventDefault();
    }
  }
};
