ESX = exports["es_extended"]:getSharedObject()

local hunger = 0
local thirst = 0
local armor = 0

Citizen.CreateThread(function ()
    while true do
        TriggerEvent('esx_status:getStatus', 'hunger', function(hungerstatus)
            hunger = hungerstatus.getPercent()
        end)

        TriggerEvent('esx_status:getStatus', 'thirst', function(thirststatus)
            thirst = thirststatus.getPercent()
        end)

        armor = GetPedArmour(PlayerPedId())

        SendNUIMessage({
            action = 'updateHud',
            health = GetEntityHealth(PlayerPedId()) - 100,
            hunger = hunger,
            thirst = thirst,
            armor = armor,
            voice = LocalPlayer.state['proximity'].distance,
            talking = NetworkIsPlayerTalking(PlayerPedId()),
        })
        
        Wait(2500)
    end
end)

Citizen.CreateThread(function()
    while true do
        local playerId = GetPlayerServerId(PlayerId())

        SendNUIMessage({
            action = "updatePlayerID",
            id = playerId
        })

        Citizen.Wait(5000)
    end
end)

Citizen.CreateThread(function()
    local lastVolume = nil
    local lastTalkingState = nil

    while true do 
        Citizen.Wait(210)
        local player = PlayerId()
        local talking = NetworkIsPlayerTalking(player)
        local volume = LocalPlayer.state.proximity.mode

        if talking ~= lastTalkingState or volume ~= lastVolume then
            lastTalkingState = talking
            lastVolume = volume
            
            SendNUIMessage({
                action = "updateVoice",
                arr = {
                    talking = talking,
                    volume = volume,
                    state = talking
                }
            })
        end
    end
end)
