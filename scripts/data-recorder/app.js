+ function ( ) {
	const graphBox = document.querySelector( '#graphBox' );

	const startButton = document.querySelector( '#startButton' );
	const stopButton = document.querySelector( '#stopButton' );
	const clearButton = document.querySelector( '#clearButton' );
	const exportButton = document.querySelector( '#exportButton' );
	
	navigator.permissions.query( { 'name': 'accelerometer' } ).then( function ( result ) {
		if ( result.state === 'granted' ) {
			doit( );
		} else {
			alert( 'please grant' );
		}
		// Don't do anything if the permission was denied.
	} );

	function doit( ) {
		let sensor;

		try {
			sensor = new LinearAccelerationSensor( { 'frequency': 60 } );
		} catch ( e ) { }

		if ( sensor === undefined ) {
			alert( 'cannot create sensor reader instance' );
			return;
		}

		const chart = new SmoothieChart( );

		const xSeries = new TimeSeries( );
		const ySeries = new TimeSeries( );
		const zSeries = new TimeSeries( );

		chart.addTimeSeries( xSeries, { 'strokeStyle': 'rgb(0, 255, 0)', 'fillStyle': 'rgba(0, 255, 0, 0.4)' } );
		chart.addTimeSeries( ySeries, { 'strokeStyle': 'rgb(255, 0, 255)', 'fillStyle': 'rgba(255, 0, 255, 0.3)' } );
		chart.addTimeSeries( zSeries, { 'strokeStyle': 'rgb(0, 0, 255)', 'fillStyle': 'rgba(0, 0, 255, 0.3)' } );

		chart.streamTo( graphBox );

		setTimeout( ( ) => chart.stop( ), 100 ); 

		const datas = [ ];

		sensor.addEventListener( 'reading', ( ) => {
			const time = +new Date;

			xSeries.append( time, sensor.x );
			ySeries.append( time, sensor.y );
			zSeries.append( time, sensor.z );

			datas.push( { 't': time, 'x': sensor.x, 'y': sensor.y, 'z': sensor.z } );
		} );

		startButton.addEventListener( 'click', ( ) => {
			sensor.start( );
			chart.start( );
		} );

		stopButton.addEventListener( 'click', ( ) => {
			sensor.stop( );
			chart.stop( );
		} );

		exportButton.addEventListener( 'click', ( ) => {
			saveData( datas.map( e => `${e.t}, ${e.x}, ${e.y}, ${e.z}` ).join( String.fromCodePoint( 10 ) ), 'data.csv', 'text/csv' );
		} );

		clearButton.addEventListener( 'click', ( ) => {
			datas = [ ];
		} );
	}

	function saveData( data, name, type ) {
		const link = document.createElement( 'a' );

		document.body.appendChild( link );

		const url = URL.createObjectURL( new Blob( [ data ], { 'type': type || 'octet/stream' } ) );

		link.href = url;
		link.download = name;

		link.dispatchEvent( new MouseEvent( 'click', { 'bubbles': true, 'cancelable': true, 'view': window } ) );

		setTimeout( ( ) => { URL.revokeObjectURL( url ); document.body.removeChild( link ) }, 100 );
	}
} ( );