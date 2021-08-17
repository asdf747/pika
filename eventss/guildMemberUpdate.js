module.exports = async (client, oldMember, newMember) => {
if(newMember.guild.id === '655780171496030240' && !oldMember.roles.cache.some(r => r.id === '783924903061618728') && newMember.roles.cache.some(r => r.id === '783924903061618728')){
    const role = newMember.guild.roles.cache.get('789432483166945300')
    newMember.roles.add(role, 'Got the 25M donator role.')
}

}