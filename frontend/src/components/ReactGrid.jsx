import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ReactGrid = ()=>{
  const layoutConfig = [
    { i: 'item1', x: 1, y: 0, w: 2, h: 3 },
    { i: 'item2', x: 2, y: 0, w: 2, h: 3 },
    { i: 'item3', x: 3, y: 0, w: 2, h: 3 }
  ];

  return (
    <GridLayout className="example-layout" layout={layoutConfig} cols={3} rowHeight={20} width={500}>
      <div key="item1" style={{ background: '#ff4d4f' }}>Item 1</div>
      <div key="item2" style={{ background: '#40a9ff' }}>Item 2</div>
      <div key="item3" style={{ background: '#73d13d' }}>Item 3</div>
    </GridLayout>
  );
}

export default ReactGrid