(async () => {
    const baseUrl = 'https://sg5.fusionsolar.huawei.com';
    const userName = 'YOUR_USERNAME';
    const systemCode = 'YOUR_SYSTEM_CODE';

    const loginRes = await fetch(`${baseUrl}/thirdData/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, systemCode })
    });

    const token = loginRes.headers.get('xsrf-token');
    const plantsRes = await fetch(`${baseUrl}/thirdData/stations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xsrf-token': token
        },
        body: JSON.stringify({ pageNo: 1 })
    });
    const plantsData = await plantsRes.json();

    const plantCodes = plantsData.data.list.map(p => p.plantCode).join(',');

    const kpiRes = await fetch(`${baseUrl}/thirdData/getStationRealKpi`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'XSRF-TOKEN': token
        },
        body: JSON.stringify({ stationCodes: plantCodes })
    });

    const kpiData = await kpiRes.json();
    console.log('Realtime KPI Data:')
    console.log(JSON.stringify(kpiData, null, 2));

})();