import { useMemo, useState } from 'react'
import { SAMPLE_FLAGS } from './data/sampleFlags'
import { Dashboard } from './screens/Dashboard/Dashboard'
import { DetailView } from './screens/DetailView/DetailView'
import { CheckIn } from './screens/CheckIn/CheckIn'
import { Escalate } from './screens/Escalate/Escalate'
import { Success } from './screens/Success/Success'

function App() {
  const [flags, setFlags] = useState(SAMPLE_FLAGS)
  const [filter, setFilter] = useState('all')
  const [screen, setScreen] = useState('dashboard')
  const [selectedId, setSelectedId] = useState(null)
  const [checkInOutcome, setCheckInOutcome] = useState(null)
  const [checkInNote, setCheckInNote] = useState('')
  const [escalateConsent, setEscalateConsent] = useState(false)
  const [successType, setSuccessType] = useState(null)

  const selectedFlag = useMemo(() => flags.find((flag) => flag.id === selectedId) ?? null, [flags, selectedId])

  function resetFlowState() {
    setCheckInOutcome(null)
    setCheckInNote('')
    setEscalateConsent(false)
    setSuccessType(null)
  }

  function goToDashboard() {
    resetFlowState()
    setSelectedId(null)
    setScreen('dashboard')
  }

  function goToDetail(flagId) {
    resetFlowState()
    setSelectedId(flagId)
    setScreen('detail')
  }

  function goToCheckIn() {
    setCheckInOutcome(null)
    setCheckInNote('')
    setScreen('checkin')
  }

  function goToEscalate() {
    setEscalateConsent(false)
    setScreen('escalate')
  }

  function handleSelectFlag(selectedId) {
    goToDetail(selectedId)
  }

  function handleBackToDashboard() {
    goToDashboard()
  }

  function handleCheckInSubmit() {
    if (!selectedId || !checkInOutcome || !selectedFlag) return

    setFlags((previousFlags) =>
      previousFlags.map((flag) => {
        if (flag.id !== selectedId) return flag

        const outcomeNote =
          checkInOutcome === 'fine'
            ? 'Check-in logged: student was fine.'
            : checkInOutcome === 'low'
              ? 'Check-in logged: student seemed low.'
              : checkInOutcome === 'distress'
                ? 'Check-in logged: student disclosed distress.'
                : 'Check-in logged: could not reach student.'

        return {
          ...flag,
          status: 'resolved',
          outcome: checkInOutcome,
          outcomeNote: checkInNote.trim() || outcomeNote,
        }
      }),
    )

    setSuccessType('checkin')
    setScreen('success')
  }

  function handleEscalateSubmit() {
    if (!selectedId || !selectedFlag || !escalateConsent) return

    setFlags((previousFlags) =>
      previousFlags.map((flag) => {
        if (flag.id !== selectedId) return flag

        return {
          ...flag,
          escalated: true,
          outcome: 'escalated',
          outcomeNote: 'Escalated to support after peer review.',
        }
      }),
    )

    setSuccessType('escalate')
    setScreen('success')
  }

  function handleSuccessBack() {
    goToDashboard()
  }

  if (screen === 'detail' && selectedFlag) {
    return (
      <DetailView
        flag={selectedFlag}
        onBack={handleBackToDashboard}
        onCheckIn={goToCheckIn}
        onEscalate={goToEscalate}
      />
    )
  }

  if (screen === 'checkin' && selectedFlag) {
    return (
      <CheckIn
        flag={selectedFlag}
        outcome={checkInOutcome}
        note={checkInNote}
        onOutcomeChange={setCheckInOutcome}
        onNoteChange={setCheckInNote}
        onBack={() => setScreen('detail')}
        onSubmit={handleCheckInSubmit}
      />
    )
  }

  if (screen === 'escalate' && selectedFlag) {
    return (
      <Escalate
        flag={selectedFlag}
        consent={escalateConsent}
        onConsentChange={setEscalateConsent}
        onBack={() => setScreen('detail')}
        onSubmit={handleEscalateSubmit}
      />
    )
  }

  if (screen === 'success') {
    return <Success type={successType} flag={selectedFlag} onBack={handleSuccessBack} />
  }

  return <Dashboard flags={flags} filter={filter} onFilterChange={setFilter} onSelectFlag={handleSelectFlag} />
}

export default App
