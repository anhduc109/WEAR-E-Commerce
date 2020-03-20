import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '../types'
import { toggleBanAlert } from '../redux/actions'

const BanAlertDialog = () => {
  const isAlertOpen = useSelector((state: AppState) => state.ui.isAlertOpen)
  const dispatch = useDispatch()

  return (
    <>
      <Dialog
        open={isAlertOpen}
        onClose={() => dispatch(toggleBanAlert(false))}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Sorry! Your account is <span className="red-text">banned</span>.
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Is that you, Umer? You have violated our regulations and cannot
            login to WEAR system anymore. Please contact our admin for further
            details via this email: ducpham1098@gmail.com
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => dispatch(toggleBanAlert(false))}
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BanAlertDialog
