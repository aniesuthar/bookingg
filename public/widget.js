(function () {
    console.log("Widget script loaded");
  
    const script = document.currentScript;
    const widgetId = script.getAttribute('data-widget-id');
    console.log("Widget ID:", widgetId);
  
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'my-nextjs-widget-container';
    document.body.appendChild(widgetContainer);
    console.log("Widget container added to DOM");
  
    function loadScript(src, onload) {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = onload;
      document.head.appendChild(script);
    }
  
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'http://localhost:3000/my-widget.css'; // Path to CSS file
    document.head.appendChild(link);
    console.log("CSS linked:", link.href);
  
    fetch(`http://localhost:3000/api/widget-data?widgetId=${widgetId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Widget data fetched:", data);
  
        if (!window.React || !window.ReactDOM) {
          loadScript('https://unpkg.com/react@^18/umd/react.production.min.js', () => {
            loadScript('https://unpkg.com/react-dom@^18/umd/react-dom.production.min.js', () => {
              loadScript('http://localhost:3000/my-widget.js', () => {
                console.log("Widget JS loaded");
                const MyWidget = window.MyWidgetLibrary.default;
                ReactDOM.render(
                  React.createElement(MyWidget, { data }),
                  widgetContainer
                );
              });
            });
          });
        } else {
          loadScript('/my-widget.js', () => {
            console.log("Widget JS loaded");
            const MyWidget = window.MyWidgetLibrary.default;
            ReactDOM.render(
              React.createElement(MyWidget, { data }),
              widgetContainer
            );
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching widget data:", err);
      });
  })();
  