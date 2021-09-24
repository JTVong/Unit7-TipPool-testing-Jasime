describe('Servers test (with setup and tear-down) ', () => {
  beforeEach(()=>{
    serverName.value = 'Alice';
  })
  it(`should add serverName in allServerName if serverName doesn't exist `), ()=>{
    expect(allServerName.length).toEqual(1);
  }
  it(`should not add serverName in allServerName if serverName already exists regardless of case sensitive and space before and after serverNa  `), ()=>{
    allServerName = ['Alice'];
    serverName.value = ' alice'
    expect(allServerName.length).toEqual(1);
  }
  it(`should not take empty string`), ()=>{
    serverName.value = " ";
    expect(allServerName.length).toEqual(0);
  }

});
